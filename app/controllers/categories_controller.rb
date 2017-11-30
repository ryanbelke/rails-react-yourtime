class CategoriesController < ApplicationController
  def new
    @workplace = Workplace.friendly.find(params[:workplace_id])
    @category = @workplace.categories.build
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

  private
  def category_params
    params.require(:category).permit(:category_name, :category_address, :category_description)
  end

end
