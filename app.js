function Day()
{
	var self = {};
	
	self.MonthNum;
	self.MonthDayNum;
	self.LifeDayNum;
	self.Type;
	
	return self;
}


function Year()
{
	var self = {};
	
	self.YearNum;
	self.Days = [];
	
	self.DayCount = function()
	{
		var total = self.Days.length;
		return total;
	}
	
	return self;
}

function Life()
{
	var self = {};
	
	self.BirthYearNum = 1990;
	self.DeathAge = 90;
	self.Years = [];
	
	self.BirthString = function(){
		return '01/24/' + self.BirthYearNum;
	};
	
	self.DayCount = function()
	{
		var total = self.Years.reduce(function(prev, cur) {
			return prev + cur.DayCount();
		},0);
		
		return total;
	}
	
	return self;
}

function AppViewModel() {
	var self = this;
	
	self.life = Life();
	self.today = moment();

	self.birthMoment = moment(self.life.BirthString());
	self.deathMoment = self.birthMoment.clone().add(self.life.DeathAge,'years');

	self.firstDayNum = self.birthMoment.dayOfYear();
	self.numberOfDays = self.deathMoment.diff(self.birthMoment,'days');
	self.lastDayNum = self.numberOfDays + self.deathMoment.dayOfYear();
	self.todayNum = self.today.diff(self.birthMoment,'days');
	
	self.lifeDayIndex = 0;
	
	// for each year
	for (var i = 0; i <= self.life.DeathAge; i++)
	{
		var yearNum = self.life.BirthYearNum + i;
		var year = Year();

		year.YearNum = yearNum;
		
		var yearDayIndex = 0;
		
		// for each month, calculate number of days
		for (var j = 0; j < 12; j++)
		{
			var monthNum = j + 1;
			
			var k = moment(monthNum + '-' + yearNum, 'M-YYYY').daysInMonth();
			
			// for each day
			for (var l = 0; l < k; l++)
			{
				var dayNum = l + 1;
				var lifeDayNum = self.lifeDayIndex + 1;
				var day = Day();
				
				day.MonthNum = monthNum;
				day.MonthDayNum = dayNum;
				day.LifeDayNum = lifeDayNum;
				
				// lived
				if (lifeDayNum < self.todayNum)
				{
					day.Type = 'gray';
				}
				// unlived
				if (lifeDayNum < self.firstDayNum
				    || lifeDayNum > self.lastDayNum)
				{
					day.Type = 'black';
				}
				// today
				if (lifeDayNum === self.todayNum)
				{
					day.Type = 'red';
				}
				// to live
				if (day.Type===undefined)
				{
					day.Type = 'white'
				};
				
				year.Days[yearDayIndex] = day;
				yearDayIndex = yearDayIndex + 1;
				self.lifeDayIndex = lifeDayNum;
			}
		}
		self.life.Years[i] = year;
	}
}
