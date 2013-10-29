class User < ActiveRecord::Base
  devise :database_authenticatable, :rememberable, :trackable

  store :data, accessors: [:first_name, :last_name, :primary_phone, :secondary_phone]

  has_many :fields

  def to_s
    login
  end

end
