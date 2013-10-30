class Field < ActiveRecord::Base

  store :data

  belongs_to :user
  has_one :operation

end
