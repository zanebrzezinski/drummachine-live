class PatternsController < ActionController::Base

  def create
    @title = pattern_params[:title]
    @pattern = pattern_params[:pattern]
    render :show
  end

  def delete
  end

  def index
  end

  private

  def pattern_params
    params.require(:pattern).permit(:title, :pattern)
  end

end
