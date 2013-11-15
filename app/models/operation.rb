class Operation < ActiveRecord::Base

  store :data

  belongs_to :user
  belongs_to :field

  before_destroy :remove_files

  def as_json(opts)
    data = slice(:id, :data)
    data[:updated_at] = updated_at.to_s(:db)

    data
  end

  def remove_files
    Dir.rmdir("public/uploads/operations/#{self.id}/")
  end

end
