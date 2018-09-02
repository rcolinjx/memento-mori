// enum DayType
// {
//	Unlivable = 0
// 	,Lived = 1
//	,WillLive = 2
//	,Today = 3
// }

// classes
function Day()
{
	var self = {};
	
	self.Type;
	
	return self;
}

function Month()
{
	var self = {};
	
	self.MonthNum;
	self.Days = [];
	
	self.DayCount;
	
	return self;
}

function Year()
{
	var self = {};
	
	self.YearNum;
	self.Months = [];
	
	self.YearDayCount = function()
	{
		var total = self.Months.reduce(function(prev, cur) {
			return prev + cur.DayCount;
		}, 0);
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
		return BirthYearNum + '0101';
	};
	
	return self;
}

function AppViewModel() {
	var self = this;
	
	self.life = Life();
	self.today = moment();

	self.birthMoment = moment(self.life.BirthString);
	self.deathMoment = moment(self.birthMoment).add(self.life.DeathAge,'years');

	self.totalDays = self.deathMoment.diff(self.birthMoment,'days');
	self.elapsedDays = self.today.diff(self.birthMoment,'days');

	self.remainingDays = self.totalDays - self.elapsedDays;
	
	// for each year
	for (var i = 0; i < self.life.DeathAge; i++)
	{
		var yearNum = self.life.BirthYearNum + i;
		var year = Year();

		year.YearNum = yearNum;

		// for each month, calculate number of days
		for (var j = 0; j < 12; j++)
		{
			var monthNum = j + 1;
			var month = Month();

			month.MonthNum = monthNum;
			month.DayCount = 
				moment(monthNum + '-' + yearNum, 'M-YYYY').daysInMonth();
			
			// if month before birth month
			
			// if month is birth month
			// if month is before today
			// if date is today
			// if date is after death

			year.Months[j] = month;
		}

		self.life.Years[i] = year;
	}
}
