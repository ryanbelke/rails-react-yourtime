class CategoriesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

  def index
    @workplace = Workplace.friendly.find(params[:workplace] || params[:workplace_id])
    @category_feed = @workplace.categories
    #set workplace in info cookie
    cookies[:workplace] =  @workplace.slug

    if @category_feed.count == 1
      #Take First Location, redirect to that locations services
      @category = @category_feed.first
      redirect_to workplace_category_path(@workplace.slug, @category.slug)
    end
    puts @category_feed.to_yaml
  end

  def new
    @workplace = Workplace.friendly.find(params[:workplace_id])
    @category = @workplace.categories.build
    @category_names = @workplace.categories.pluck(:category_name)
  end

  def edit
    @workplace = Workplace.friendly.find(params[:workplace_id])
    @category = Category.friendly.find(params[:id])
  end

  def update
    @category = Category.friendly.find(params[:id])
    if @category.update_attributes(category_params)
      flash[:success] = "Category updated"
      redirect_to root_url
    else
      render 'edit'
    end
  end

  def create
    if @current_user.admin?
      @workplace = Workplace.friendly.find(params[:workplace_id])
      @category = @workplace.categories.build(category_params)
      if @category.save
        if params[:create_and_add]
          flash[:success] = "Category Created, adding dates"
          redirect_to new_category_schedule_path(@category.slug)
        else
          flash[:success] = "Category created"
          redirect_to root_url
        end

      else
        @feed_items = []
        render 'static_pages/home'
      end
    end
  end



  def show
    @workplace = Workplace.friendly.find(params[:workplace_id])
    @category = Category.friendly.find(params[:id])

    @schedule_feed = @category.schedules
  end

  private
  def category_params
    params.require(:category).permit(:category_name, :category_address,
                                     :category_description, :category_info,
                                     :category_icon)
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end
end
