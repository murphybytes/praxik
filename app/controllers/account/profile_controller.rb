class Account::ProfileController < AccountsController

  def show

    render json: current_user
  end

  def update
    unless profile_params.blank?
        current_user.update(profile_params)
    end

    render json: current_user
  end

  def update_password
    current_user.update_with_password(password_params)

    p profile_params
    p current_user.errors
    render json: current_user
  end

  def profile_params
    params.permit(:email, :login, :first_name, :last_name, 
                  :primary_phone, :secondary_phone)
  end

  def password_params
    params.permit(:current_password, :password, :password_confirmation)
  end


end
