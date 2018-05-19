class SchedulesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update, :new]
  def new
    @location = Location.friendly.find(params[:location_id])
    @schedule = @location.schedules.new
    @schedule_feed = @location.schedules
  end

  def create
    if params[:create_and_add]
      date = params[:schedule][:date]
      date_unix = date
      date_unix = Date.parse(date)
      unix = date.to_time.to_i
      @location = Location.friendly.find(params[:location_id])
      @sched = @location.schedules.new(schedule_params)
      @sched.unix = unix

      if @sched.save
        redirect_to new_location_schedule_path(@location)
      end
    else
      date = params[:schedule][:date]
      date = Date.parse(date)
      unix = date.to_time.to_i
      @location = Location.friendly.find(params[:location_id])
      @sched = @location.schedules.new(schedule_params)
      @sched.unix = unix
      if @sched.save
       redirect_to root_url
      end

    end
  end

  def update
    @location = Location.friendly.find(params[:location_id])
    @schedule = @location.schedules.friendly.find(params[:id])

    date = params[:schedule][:date]
    date = Date.parse(date)
    unix = date.to_time.to_i

    @schedule.unix = unix

    if @schedule.update_attributes(schedule_params)
      flash[:success] = "Schedule updated"
      redirect_to root_url
    else
      render 'edit'
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
                                     :available, :unix)
  end
end
