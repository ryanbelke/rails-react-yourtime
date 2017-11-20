class ServicesController < ApplicationController
    before_action :logged_in_user, only: [ :create ]
    #before_action :correct_user,   only: [:create, :index]
    before_action :admin_user,     only: [:edit, :create, :destroy]

    #GET /SERVICE
    def index
      @workplace = params[:parking]
    end
    #POST /SERVICE
    def create

    end
    #PUT /SERVICE/:ID
    def edit

    end
    #DELETE /SERVICE/:ID
    def destroy

    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation, :first_name, :last_name, :address,
                                   :city, :state, :zip )
    end

    # Before filters

    # Confirms the correct user.
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

    # Confirms an admin user.
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
  end