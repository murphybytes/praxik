class Field < ActiveRecord::Base

  store :data

  belongs_to :user
  has_one :operation

  def as_json(opts)
    slice(:id, :data)
  end

end
