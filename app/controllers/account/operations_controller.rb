class Account::OperationsController < AccountsController

  def index
    @operations = current_user.operations
    render json: @operations
  end

  def show
    @operation = Operation.find(params[:id])

    render json: @operation
  end

  def update
    @operation = Operation.find(params[:id])

    unless params[:data].blank?
      @operation.data = params[:data]
      @operation.save
    end

    render json: @operation
  end

  def create 
    @operation = current_user.operations.create(data: params[:data])

    render json: @operation
  end

end
