class HomeController < ApplicationController
  layout "main"

  def services
    render "public/pages/services.html"
  end

  def contact
    render "public/pages/contact.html"
  end

  def about 
    render "public/pages/about.html"
  end
end
