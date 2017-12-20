class SchedulesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]
  def new
    @category = Category.friendly.find(params[:category_id])
    @schedule = @category.schedules.build
    @schedule_feed = @category.schedules
  end

  def create
    if params[:create_and_add]
      @category = Category.friendly.find(params[:category_id])
      @schedule = @category.schedules.create!(schedule_params)
      redirect_to new_category_schedule_path(@category)
    else
      @category = Category.friendly.find(params[:category_id])
      @schedule = @category.schedules.create!(schedule_params)
      redirect_to root_url
    end
  end

  private

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  def schedule_params
    params.require(:schedule).permit(:category_id, :appointment_id,
                                     :date, :date_capacity, :date_reserved,
                                     :available)
  end
end
