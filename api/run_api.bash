export $( cat local.env | egrep -v '^#' | xargs )

uvicorn main:app --reload