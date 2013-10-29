class Profile < ActiveRecord::Base

  store :data, accessors: [:first_name, :last_name, :primary_phone, :secondary_phone]

  belongs_to :user

end
