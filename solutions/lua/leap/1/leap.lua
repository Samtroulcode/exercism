local leap_year = function(number)
	if number % 4 ~= 0 then
		return false
	elseif number % 100 ~= 0 then
		return true
	elseif number % 400 ~= 0 then
		return false
	end
end

return leap_year
