local leap_year = function(number)
	if number % 400 == 0 then
		return true
	elseif number % 100 == 0 then
		return false
	elseif number % 4 == 0 then
		return true
	else
		return false
	end
end

return leap_year
