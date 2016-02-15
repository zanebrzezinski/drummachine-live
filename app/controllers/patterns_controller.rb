class PatternsController < ActionController::Base

  def create
    patterns = session[:patterns] || "{}"
    patterns = JSON.parse(patterns)
    patterns[pattern_params[:title]] = pattern_params[:pattern]
    session[:patterns] = patterns.to_json
    @title = pattern_params[:title]
    @pattern = pattern_params[:pattern]
    render :show
  end

  def delete
  end

  def index
    @patterns = session[:patterns]
    render :index
  end

  private

  def pattern_params
    params.require(:pattern).permit(:title, :pattern)
  end

end
