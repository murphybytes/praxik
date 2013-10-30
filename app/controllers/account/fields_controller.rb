class Account::FieldsController < AccountsController

  def index
    @fields = current_user.fields

    fields = @fields.map{|field| {id: field.id}.merge(field.data)}
    render json: fields
  end

  def show
    @field = Field.find(params[:id])

    render json: {id: @field.id}.merge(@field.data)
  end

  def new
    render "form.html"
  end

  def update
    @field = Field.find(params[:id])
    @field.data = params
    @field.save

    render json: @field.id 
  end

  def create 
    @field = current_user.fields.create(id: params[:id], data: params)

    render json: {id: @field.id}.merge(@field.data || {})
  end

end
