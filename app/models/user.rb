class User < ActiveRecord::Base
  devise :database_authenticatable, :rememberable, :trackable, :registerable, :recoverable

  store :data, accessors: [:first_name, :last_name, :primary_phone, :secondary_phone]

  has_many :fields
  has_many :operations

  def to_s
    login
  end

end
