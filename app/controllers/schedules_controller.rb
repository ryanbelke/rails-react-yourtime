class SchedulesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]
  def new
    @location = Location.friendly.find(params[:location_id])
    @schedule = @location.schedules.new
    @schedule_feed = @location.schedules
  end

  def create
    if params[:create_and_add]
      @location = Location.friendly.find(params[:location_id])
      @schedule = @location.schedules.create!(schedule_params)
      redirect_to new_location_schedule_path(@location)
    else
      @location = Location.friendly.find(params[:location_id])
      @schedule = @location.schedules.create!(schedule_params)
      redirect_to root_url
    end
  end

  def update
    @location = Location.friendly.find(params[:location_id])
    @schedule = @location.schedules.friendly.find(params[:id])
    if params[:create_and_add]
      if @schedule.update_attributes(schedule_params)
      flash[:success] = 'Schedule updated'
      redirect_to edit_location_schedule_path(@location, @schedule)
      else
        render 'edit'
      end

    else
      if @schedule.update_attributes(schedule_params)
        flash[:success] = "Schedule updated"
        redirect_to root_url
      else
        render 'edit'
      end
    end

  end

  def destroy
    Schedule.friendly.find(params[:id]).destroy
    flash[:success] = "Schedule deleted"
    redirect_to request.referrer || root_url
  end

  def edit
    @location = Location.friendly.find(params[:location_id])
    @schedule = Schedule.friendly.find(params[:id])
    @schedule_feed = @location.schedules
  end

  private

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  def schedule_params
    params.require(:schedule).permit(:category_id, :booking_id,
                                     :date, :date_capacity, :date_reserved,
                                     :available)
  end
end
