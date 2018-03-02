class SectionsController < ApplicationController
  include ReactOnRails::Controller


  def new
    @location = Location.friendly.find(params[:location_id])
    @section = @location.sections.new
  end

  def create
    @location = Location.friendly.find(params[:location_id])
    @section = @location.sections.new(section_params)
    if @section.save
      if params[:create_and_add]
        flash[:success] = "Section created, adding services"
        redirect_to new_section_service_path(@section.slug)
      else
        flash[:success] = "Section created"
        redirect_to root_url
      end

    else
      @feed_items = []
      render 'static_pages/home'
    end
  end

  def index
    redux_store("commentsStore")

    @location = Location.friendly.find(params[:location_id])
    @section_feed_items = @location.sections
    cookies[:location] = @location.slug

  end

  def show
    @location = Location.friendly.find(params[:location_id])
    @section = Section.friendly.find(params[:id])
  end

  def destroy
    Section.friendly.find(params[:id]).destroy
    flash[:success] = "Section & Associated Services Deleted"
    delete_cookies
    redirect_to root_url
  end

  private

  def section_params
    params.require(:section).permit(:section_name,  :section_description)

  end
end
