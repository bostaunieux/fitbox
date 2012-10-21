# CLEAN
Lift.create(
	:name => 'Clean',
	:description => 'Clean',
	:lift_category => LiftCategory.first(:name => 'Clean')
)

Lift.create(
	:name => 'Squat Clean',
	:description => 'Squat Clean',
	:lift_category => LiftCategory.first(:name => 'Clean')
)

Lift.create(
	:name => 'Power Clean',
	:description => 'Power Clean',
	:lift_category => LiftCategory.first(:name => 'Clean')
)

Lift.create(
	:name => 'Hang Power Clean',
	:description => 'Hang Power Clean',
	:lift_category => LiftCategory.first(:name => 'Clean')
)

# SHOULDER-TO-OVERHEAD
Lift.create(
	:name => 'Press',
	:description => 'Press',
	:lift_category => LiftCategory.first(:name => 'Shoulder-To-Overhead')
)

Lift.create(
	:name => 'Push Press',
	:description => 'Push Press',
	:lift_category => LiftCategory.first(:name => 'Shoulder-To-Overhead')
)

Lift.create(
	:name => 'Jerk',
	:description => 'Jerk',
	:lift_category => LiftCategory.first(:name => 'Shoulder-To-Overhead')
)

Lift.create(
	:name => 'Push Jerk',
	:description => 'Push Jerk',
	:lift_category => LiftCategory.first(:name => 'Shoulder-To-Overhead')
)

# OLYMPIC LIFT
Lift.create(
	:name => 'Clean & Jerk',
	:description => 'Clean & Jerk',
	:lift_category => LiftCategory.first(:name => 'Olympic Lift')
)

Lift.create(
	:name => 'Snatch',
	:description => 'Snatch',
	:lift_category => LiftCategory.first(:name => 'Olympic Lift')
)

Lift.create(
	:name => 'Power Snatch',
	:description => 'Snatch',
	:lift_category => LiftCategory.first(:name => 'Olympic Lift')
)

Lift.create(
	:name => 'Squat Snatch',
	:description => 'Snatch',
	:lift_category => LiftCategory.first(:name => 'Olympic Lift')
)

# DEADLIFT
Lift.create(
	:name => 'Deadlift',
	:description => 'Deadlift',
	:lift_category => LiftCategory.first(:name => 'Deadlift')
)

Lift.create(
	:name => 'Sumo Deadlift',
	:description => 'Sumo Deadlift',
	:lift_category => LiftCategory.first(:name => 'Deadlift')
)

# SQUAT
Lift.create(
	:name => 'Back Squat',
	:description => 'Back Squat',
	:lift_category => LiftCategory.first(:name => 'Squat')
)

Lift.create(
	:name => 'Front Squat',
	:description => 'Front Squat',
	:lift_category => LiftCategory.first(:name => 'Squat')
)

Lift.create(
	:name => 'Overhead Squat',
	:description => 'Overhead Squat',
	:lift_category => LiftCategory.first(:name => 'Squat')
)



