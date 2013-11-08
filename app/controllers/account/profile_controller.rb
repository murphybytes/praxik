class Account::ProfileController < AccountsController

  def show

    render json: current_user
  end

  def update
    unless profile_params.blank?
      res = current_user.update(profile_params)
      p "DEBUG"
      p res
      p "DEBUG"
    end

    render json: current_user
  end

  def profile_params
    params.permit(:email, :login, :first_name, :last_name, :primary_phone, :secondary_phone)
  end

end
