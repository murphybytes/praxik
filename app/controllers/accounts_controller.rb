class AccountsController < ApplicationController
  layout "account"
  before_filter :authenticate_user!

  def index
  end

  def upload
    upload = ReportsUploader.new(params[:dir])
    resp = upload.store!(params[:file])

    render json: {path: upload.store_path, name: upload.filename}
  end

end
