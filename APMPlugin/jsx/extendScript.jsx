
$.runScript = {


	getInfo: function(documentProductionType) {


//get adjusted Project name----------------------------------------------------
			var project = app.project;
			var fullProjectName = project.name;
			var indexOfPeriod = fullProjectName.indexOf(".");
			var adjustedProjectName = fullProjectName.substring(0, indexOfPeriod);


// ---- get APM track Title -----------------------------------------------------
			var sequence = project.activeSequence;
			var audioTracks = sequence.audioTracks;
			var apmTracks = [];
			for(i = 0; i < audioTracks.numTracks; i++){
					var track = audioTracks[i];
					for (j= 0; j < track.clips.numItems; j++){
							var audioClip = track.clips[j];
							var clipTitle = audioClip.name;
							if(clipTitle.indexOf("APM") !== -1){
								apmTracks.push(clipTitle);
							}
					}
			}

			if(apmTracks.length === 0){
				alert("No APM music tracks found in timeline");
              //  break;
			}

			alert("Found " + apmTracks.length + " number of tracks");


			var projectItem = sequence.projectItem;
			var inPoint = sequence.projectItem.getInPoint();
			var outPoint = sequence.projectItem.getOutPoint();
			var productionType = documentProductionType;
			var currentDate = new Date();
			var currentMonth = currentDate.getMonth() + 1;



//-----Access the file -------------------------------//


			//****************************************************************************************************************************************//
			//--------------------------------------------------------------------//
			//---------------  CHANGE THIS LINE TO THE TEXT FILE    -------------------//
			// --------------  WHERE YOU WANT YOUR DATA LOGGED -------------------//
				var filepath = "/PATH_TO/FILE/APM_MUSIC_USAGE_DATA.txt";



				var file = File(filepath);

				//if that file doesn't exist, create one
				if(!file.exists){
					alert("File for apm data didn't exist.  Creating one");
					file = new File(filepath);
				}

				//var myFile = File.openDialog("Choose your file");
				//sif(myFile != null) //donothing



//----- Get time in minutes:seconds -----------------//

			var minuteCount = null;
			var secondsCount = null;
			if(outPoint.seconds > 60){
				minuteCount = outPoint.seconds / 60;
				minuteCount = Math.round(minuteCount);
				secondsCount = outPoint.seconds % 60;
				secondsCount = Math.round(secondsCount);
			}

			else{
				minuteCount = null;
				secondsCount = outPoint.seconds;
			}



//------ Append data to file -----------------------//

			// the a is for append
			file.open('a',);
			if(file !== ''){
                for(i = 0; i < apmTracks.length; i++){
										file.writeln(adjustedProjectName + ", "
																	+ productionType + ", "
																	+ minuteCount + "min " + secondsCount + "secs" + ", "
																	+ apmTracks[i] + ", "
																	+ currentMonth + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() );
	              }

				file.close();
			}

			var allTracks = "apm tracks: ";
			for(i = 0; i < apmTracks.length; i++){
				allTracks = allTracks.concat(apmTracks[i] + ", ");
			}

			alert( "The following info was put into the APM usage file " + "\n" +
								adjustedProjectName + " , " +
								productionType + " , " +
								minuteCount + "min " + secondsCount + " sec , " +
								currentMonth + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() +
								" along with the following " + allTracks  );

		//--------------------------------------------------------------------------------------------------------------------------------------------------
	}

}
