class Account::FieldsController < AccountsController

  def index
    @fields = current_user.fields

    render json: @fields
  end

  def show
    @field = Field.find(params[:id])

    render json: @field
  end

  def new
    render "form.html"
  end

  def update
    @field = Field.find(params[:id])

    unless params[:data].blank?
      @field.data = params[:data]
      @field.save
    end

    render json: @field
  end

  def create 
    @field = current_user.fields.create(data: params[:data])

    render json: @field
  end

end
