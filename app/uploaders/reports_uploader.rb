class ReportsUploader < CarrierWave::Uploader::Base
  storage :file

  def initialize(sub_dir)
    @sub_dir = sub_dir
  end

  def store_dir
    "uploads/#{@sub_dir}"
  end

end
