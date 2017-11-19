class WorkplacesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @feed_items = Workplace.where.not(workplace_name: "Not Listed").paginate(page: params[:page])
  end
  def new
    @workplace = Workplace.new
  end

  def edit
    @workplace = Workplace.find_by(id: params[:id])
  end
  def create
    if @current_user.admin?
     @workplace = current_user.workplaces.build(workplace_params)
      if @workplace.save
        flash[:success] = "Workplace created"
        redirect_to root_url
      else
        @feed_items = []
        render 'static_pages/home'
      end
    end

  end

  def update
    @workplace = Workplace.find(params[:id])
    if @workplace.update_attributes(workplace_params)
      flash[:success] = "Workplace updated"
      redirect_to root_url
    else
      render 'edit'
    end
  end

  def destroy
    if current_user.admin?
    Workplace.find(params[:id]).destroy
    flash[:success] = "Workplace deleted"
    redirect_to request.referrer || root_url
    end

  end

private
  def workplace_params
    params.require(:workplace).permit(:workplace_name, :location_address, :location_description, :slug)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end
end
