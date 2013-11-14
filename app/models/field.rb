class Field < ActiveRecord::Base

  store :data

  belongs_to :user
  has_one :operation

  def as_json(opts)
    slice(:id, :data, :updated_at)
  end

  def updated_at
    super.to_s :db
  end
end
