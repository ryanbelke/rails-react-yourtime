Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root   'static_pages#home'
  get    '/help',    to: 'static_pages#help'
  get    '/about',   to: 'static_pages#about'
  get    '/contact', to: 'static_pages#contact'
  get    '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  get    '/how', to: 'static_pages#how'
  get    '/pricing', to: 'static_pages#pricing'
  get    '/purchase', to: 'purchases#index'
  post   '/purchase', to: 'purchases#create'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/booking', to: 'services#booking'

  post '/services', to: 'services#index'
  resources :charges, only: [:new, :create]

  resources :workplaces do
      resources :categories
  end

=begin
  resources :categories do
    resources :services
  end
=end

  resources :categories do
    resources :locations
  end

  resources :locations do
    resources :schedules
  end

  resources :locations do
    resources :sections
  end

  resources :sections do
    resources :services
  end


  resources :users do
    resources :appointments
  end

  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
end
