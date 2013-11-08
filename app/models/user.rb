class User < ActiveRecord::Base
  devise :database_authenticatable, :rememberable, :trackable, :registerable, :recoverable, :confirmable

  store :data, accessors: [:first_name, :last_name, :primary_phone, :secondary_phone]

  has_many :fields, dependent: :destroy
  has_many :operations, dependent: :destroy

  validates :email, presence: true
  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:minimum => 3},
                       :on => :create
  validates :password, :confirmation => true,
                       :length => {:minimum => 3},
                       :allow_blank => true,
                       :on => :update

  def to_s
    login
  end

  def as_json(opts)
    attrs = slice(:id, :login, :email, :first_name, :last_name, :primary_phone, :secondary_phone)
    attrs[:errors] = errors.full_messages
    attrs[:is_valid] = attrs[:errors].blank?

    attrs
  end

end
