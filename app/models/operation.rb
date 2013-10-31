class Operation < ActiveRecord::Base

  store :data

  belongs_to :user
  belongs_to :field

  def as_json(opts)
    slice(:id, :data)
  end

end
