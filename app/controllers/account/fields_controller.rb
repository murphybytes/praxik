class Account::FieldsController < AccountsController

  def index
    @fields = current_user.fields
  end

  def edit 
    @field = Field.find(params[:id])

    render json: @field
  end

  def new
    render "form.html"
  end

end
