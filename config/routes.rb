Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :patterns, only: [:create, :index, :show]
  
end
