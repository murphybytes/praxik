class Operation < ActiveRecord::Base

  store :data

  belongs_to :user
  belongs_to :field

  def as_json(opts)
    data = slice(:id, :data)
    data[:updated_at] = updated_at.to_s(:db)

    data
  end

end
