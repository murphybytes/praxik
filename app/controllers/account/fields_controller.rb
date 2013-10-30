class Account::FieldsController < AccountsController

  def index
    @fields = current_user.fields

    fields = @fields.map{|field| {id: field.id}.merge(field.data)}
    render json: fields
  end

  def show
    @field = Field.find(params[:id])

    render json: @field.data
  end

  def new
    render "form.html"
  end

end
