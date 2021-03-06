Praxik::Application.routes.draw do
  devise_for :users, { :controllers => { :registrations  => "registrations" } }
  devise_scope :user do
    get 'users/please_confirm', to: "registrations#please_confirm", as: :user_registration_confirm
  end

  get '/', to: "home#index"
  get '/account', to: "accounts#index"
  get '/services', to: "home#services"
  get '/contact', to: "home#contact"
  get '/about', to: "home#about"
  get '/terms', to: "home#terms"
  get '/privacy', to: "home#privacy"

  namespace :account do
    resources :fields 
    resources :operations do
    end

    get '/profile', to: "profile#show"
    put '/profile', to: "profile#update"
    put '/update_password', to: "profile#update_password"
  end

  post '/account/upload', to: 'accounts#upload'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root to: "home#index"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
