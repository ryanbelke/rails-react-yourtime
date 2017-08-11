import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ActionCable from 'actioncable';
import _ from 'lodash';
import BaseComponent from 'libs/components/BaseComponent';
import { injectIntl, intlShape } from 'react-intl';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';

import CommentForm from './CommentForm/CommentForm';
import CommentList, { CommentPropTypes } from './CommentList/CommentList';
import css from './CommentBox.scss';

class CommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchComments: PropTypes.function,
    }),
    data: PropTypes.shape({
      isFetching: PropTypes.boolean,
      isSaving: PropTypes.boolean,
      submitCommentError: PropTypes.string,
      $$comments: PropTypes.arrayOf(CommentPropTypes),
    }).isRequired,
    intl: intlShape.isRequired,
  };

  constructor() {
    super();
    _.bindAll(this, [
      'refreshComments',
    ]);
    this.cable = null;
  }

  subscribeChannel() {
    const { messageReceived } = this.props.actions;
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;
    this.cable = ActionCable.createConsumer(cableUrl);

    /* eslint no-console: ["error", { allow: ["log"] }] */
    this.cable.subscriptions.create({ channel: 'CommentsChannel' }, {
      connected: () => {
        console.log('connected');
      },
      disconnected: () => {
        console.log('disconnected');
      },
      received: (comment) => {
        messageReceived(Immutable.fromJS(comment));
      },
    });
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.subscribeChannel();
  }

  componentWillUnmount() {
    this.cable.subscriptions.remove({ channel: 'CommentsChannel' });
  }

  refreshComments() {
    const { fetchComments } = this.props.actions;
    fetchComments();
  }

  render() {
    const { actions, data, intl } = this.props;
    const { formatMessage } = intl;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    const locale = data.get('locale') || defaultLocale;

    /* eslint-disable no-script-url */
    return (
      <div className="commentBox container">
        <h2>
          {formatMessage(defaultMessages.comments)}
          {data.get('isFetching') && formatMessage(defaultMessages.loading)}
        </h2>
        { SelectLanguage(actions.setLocale, locale) }
        <ul>
          <li>
            { (data.get('isFetching') && <br />) ||
              <a href="javascript:void(0)" onClick={this.refreshComments}>
                {formatMessage(defaultMessages.descriptionForceRefrech)}
              </a>
            }
          </li>
          <li>{formatMessage(defaultMessages.descriptionSupportMarkdown)}</li>
          <li>{formatMessage(defaultMessages.descriptionDeleteRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSubmitRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSeeActionCable)}</li>
        </ul>
        <CommentForm
          isSaving={data.get('isSaving')}
          error={data.get('submitCommentError')}
          actions={actions}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={data.get('$$comments')}
          error={data.get('fetchCommentError')}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}

export default injectIntl(CommentBox);
