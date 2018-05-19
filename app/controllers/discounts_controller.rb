class DiscountsController < ApplicationController
  before_action :admin_user,  only: [:new, :edit, :create, :destroy, :update]


  def new
    @discount = Discount.new
  end

  def edit
    @discount = Discount.new
  end

  def create
    @discount = Discount.new(discount_params)
    if @discount.save
      flash[:success] = "Discount Created"
      redirect_to root_url
    else
      flash[:danger] = "Error"
      render 'edit'
    end
  end

  def update
    @discount = Discount.find_by id: params[:id]
    if @discount.update_attributes(discount_params)
      flash[:success] = "Discount Updated"
      redirect_to root_url
    else
      flash[:danger] = "Error"
      render 'edit'
    end
  end

  def index

  end

  def destroy

  end

  def discount
    discount_code = params[:discount_code].upcase
    current_user = params[:current_user]
    user = User.find_by id: current_user
    user_discounts = user.discounts
    puts "user discounts " + user_discounts.to_s
    @discount = Discount.find_by discount_code: discount_code

    respond_to do |format|
      if @discount
        if !user_discounts.include?(discount_code)
          format.json { render json: { message: "discount accepted", discount: @discount, status: 302 }  }
          user.discounts.push(discount_code)
          user.save!
        elsif user_discounts.include?(discount_code)
          format.json { render json: { message: "code already used", discount: @discount, status: 403 }  }
        end
      elsif @discount.nil?
        format.json { render json: { message: "discount rejected", status: 403 }  }
      end
    end

  end

  private
  def discount_params
    params.require(:discount).permit(:discount_name, :discount_code, :discount_price, :discount_percent)

  end
end
