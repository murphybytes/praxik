class Account::FieldsController < AccountsController

  def show
    @field = Field.find(params[:id])

    render json: @field
  end

  def new
    @field = Field.new
    render "form.html"
  end

end
