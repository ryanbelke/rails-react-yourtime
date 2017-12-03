class CategoriesController < ApplicationController
  before_action :admin_user, only: [:create, :destroy, :edit, :update]

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
        flash[:success] = "Category created"
        redirect_to root_url
      else
        @feed_items = []
        render 'static_pages/home'
      end
    end
  end

  def show
    @workplace = Workplace.friendly.find(params[:workplace_id])
    @category = Category.friendly.find(params[:id])
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
