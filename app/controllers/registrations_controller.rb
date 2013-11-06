class  RegistrationsController < Devise::RegistrationsController

  def after_inactive_sign_up_path_for(resource)
    user_registration_confirm_path
  end

end
