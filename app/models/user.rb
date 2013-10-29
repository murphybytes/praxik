class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  store :data, accessors: [:first_name, :last_name, :primary_phone, :secondary_phone]

end
