class PatternsController < ActionController::Base

  def create
    patterns = session[:patterns] || "{}"
    patterns = JSON.parse(patterns)
    patterns[pattern_params[:title]] = pattern_params[:pattern]
    session[:patterns] = patterns.to_json
    render json: session[:patterns]
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
