class Field < ActiveRecord::Base

  store :data

  has_one :operation

  def method_missing(method_name, *value)
    if method_name.to_s.last == "="
      self.data[method_name] = value[0]
    else
      self.data[method_name]
    end
  end

end
