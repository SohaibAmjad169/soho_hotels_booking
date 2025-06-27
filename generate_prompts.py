import json
import random
from datetime import datetime, timedelta
from itertools import product
import uuid
import argparse

# Load hotel data
with open("src/database/hotelListData.json", "r") as file:
    hotels_data = json.load(file)


# Generates random Date Range for a booking, using a fixed base date
def generate_random_booking_dates(
    base_date=None, min_check_in_days=1, max_check_in_days=30, max_stay_duration=7
):
    if not base_date:
        random_year = random.randint(2020, 2030)
        base_date = f"{random_year}-01-01"

    try:
        base_date = datetime.strptime(base_date, "%Y-%m-%d")
    except ValueError:
        raise ValueError(
            "Invalid base_date format. Please provide date in 'YYYY-MM-DD' format."
        )

    check_in_date = base_date + timedelta(
        days=random.randint(min_check_in_days, max_check_in_days)
    )
    stay_duration = random.randint(1, max_stay_duration)
    check_out_date = check_in_date + timedelta(days=stay_duration)

    # Format dates for different usages
    human_readable_date = lambda date: date.strftime("%B %d, %Y")  # For prompts
    result_format_date = lambda date: date.strftime("%d-%m-%Y")  # For booking results

    return {
        "prompt_date_format": human_readable_date(check_in_date),
        "result_date_format": result_format_date(check_in_date),
        "prompt_check_out_format": human_readable_date(check_out_date),
        "result_check_out_format": result_format_date(check_out_date),
    }


# Format date to human-readable format
def format_date_to_human_readable(date):
    return date.strftime("%d %B %Y")


# Generate random name
def get_random_name():
    first_names = [
        "Sarah",
        "John",
        "Emily",
        "Michael",
        "Sophia",
        "Daniel",
        "Ava",
        "James",
        "Emma",
        "Liam",
        "Olivia",
        "Noah",
        "Isabella",
        "Ethan",
        "Mia",
        "Lucas",
        "Charlotte",
        "Mason",
        "Amelia",
        "Elijah",
        "Harper",
    ]
    last_names = [
        "Smith",
        "Johnson",
        "Brown",
        "Taylor",
        "Anderson",
        "Thomas",
        "Jackson",
        "White",
        "Harris",
        "Martin",
        "Clark",
        "Lewis",
        "Walker",
        "Hall",
        "Allen",
        "Young",
        "King",
        "Wright",
        "Scott",
        "Adams",
    ]

    all_names = [f"{first} {last}" for first, last in product(first_names, last_names)]
    return random.choice(all_names)


# Generate random contact information
def get_random_contact():
    phone = f"{random.randint(1000000000, 9999999999)}"
    email_providers = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"]
    email = f"user{random.randint(1000, 9999)}@{random.choice(email_providers)}"
    return phone, email


# Generate random guest count
def get_random_guest():
    return random.randint(2, 5)


# Generate random room type
def get_random_room_type():
    room_types = [
        "Economy",
        "Luxury",
        "Standard",
        "Deluxe",
        "Superior",
        "Premium",
        "Business",
        "Family",
        "Studio",
        "Suite",
        "Junior Suite",
        "Penthouse",
        "Presidential Suite",
        "Executive",
        "Bungalow",
        "Cabana",
        "Loft",
        "Villa",
        "Chalet",
        "Dormitory",
        "Accessible",
        "Garden View",
        "Sea View",
        "Mountain View",
        "City View",
    ]
    return random.choice(room_types)


def find_matching_hotel(hotels_data, room_type, guests):
    # Find matching hotels
    matching_hotels = [
        hotel
        for hotel in hotels_data
        if hotel["roomType"] == room_type and hotel["roomSeats"] == guests
    ]

    if matching_hotels:
        selected_hotel = random.choice(
            matching_hotels
        )  # Randomly select a matching hotel
        return {
            "roomType": room_type,
            "guest_count": guests,
            "hotel": selected_hotel,
        }
    else:
        return {
            "roomType": room_type,
            "guest_count": guests,
            "hotel": None,
        }


# Generate prompts with results
def create_prompts_with_results(num_prompts, output_file):
    output_list = []
    service_fee = 220

    prompt_templates = [
        "I would love to book a room at {hotel_address}. Its name is {hotel_name} in {city}. The condition of the room is {room_type} for {guests}. We will be checking in from {check_in_date} to {check_out_date}. My contact information is {name}, {phone}, or {email}.",
        "I'm planning to book {hotel_name}, which is located at {hotel_address}, {city}, and I want a {room_type} for my {guests}. They are checking in from {check_in_date} to {check_out_date}. My contact details are {name}, {phone}, {email}.",
        "I am looking to reserve a {room_type} at {hotel_name}, located at {hotel_address}, {city}, for my {guests} people. The dates are {check_in_date} to {check_out_date}. My personal information is {name}, {phone}, and {email}.",
        "I want to book a {room_type} at {hotel_name}. The address is {hotel_address}, {city}, for {guests} guests. I will provide you the dates {check_in_date} to {check_out_date}. My contact information: {name}, {phone} / {email}.",
        "I am planning to book a hotel in {city} and I prefer a {room_type} at {hotel_name}. The complete address is {hotel_address}. Dates will be {check_in_date} to {check_out_date} for {guests} people. You can contact me at {name}, {phone}, or email me at {email}.",
        "I need to book a {room_type} in {hotel_name}. The address of the hotel is {hotel_address}, in {city}. The dates are {check_in_date} to {check_out_date} for {guests} guests. My details include {name}, {phone}, {email}.",
        "I am planning to travel to {city} and I want to book {hotel_name}. I will consider this {room_type} for {guests} people. The address of the hotel is {hotel_address} from {check_in_date} to {check_out_date}. My contact information is {name}, {phone}, {email}.",
        "I would like to book a room at {hotel_name}. Here is the address: {hotel_address}, {city}. I will be checking in from {check_in_date} to {check_out_date}. I want a {room_type} for {guests} people. My contact information is {name}, {phone}, and {email}.",
        "Please book me a {room_type}. The name of the hotel is {hotel_name} for my {guests}. The address of the hotel is {hotel_address}, {city}. The check-in will be from {check_in_date} to {check_out_date}. You can contact me. My name is {name}, and my phone number is {phone}, or {email}.",
        "I would like to reserve a hotel room of a {room_type} at {hotel_name}. Its address is {hotel_address}, {city}, and there are {guests} people. The date will be {check_in_date} to {check_out_date}. My contact information is {name}, {phone}, and {email}.",
        "I need a {room_type}. The name of the hotel is {hotel_name}, and it is in {city}, {hotel_address}. I am booking it for {guests} guests, and they are staying from {check_in_date} to {check_out_date}. My contact information is {name}, {phone}, and {email}.",
        "I would like to book a {room_type} at {hotel_name}. This hotel is in {city}, and its address is {hotel_address}. I will be staying from {check_in_date} to {check_out_date}. There are {guests} people. You can contact me. My name is {name}, and my phone number is {phone}, {email}.",
        "I am planning to stay in {hotel_name}. It is in {city}, {hotel_address}, and I will prefer a {room_type}. This stay is for {guests} people. Their check-in dates are {check_in_date} to {check_out_date}. My information is {name}, {phone}, {email}.",
        "I am looking to reserve a {room_type} at {hotel_name}. It is located at {hotel_address}, {city}, for my {guests} people. My staying dates are {check_in_date} to {check_out_date}. You can contact me. My information is {name}, {phone}, and {email}.",
        "I need a room at {hotel_name}. I will prefer a {room_type}. The location will be {city}, and the address of the hotel is {hotel_address}. I will be checking in from {check_in_date} to {check_out_date}. It is for {guests} people. My contact information is {name}, {phone}, and {email}.",
        "I am visiting {city}, and I want a {room_type} at {hotel_name}. The address of the hotel is {hotel_address}. There are {guests} with me. My check-in date will be {check_in_date}, and my check-out will be on {check_out_date}. My information is {name}, {phone}, and {email}.",
        "I would like to book a room at {hotel_name}. I need this type of room: {room_type}. The check-in dates are from {check_in_date} to {check_out_date} for {guests} guests. The location of the hotel is {city}, {hotel_address}. My information is {name}, {phone}, and {email}.",
        "I would like to reserve a room of {room_type}. The name of the hotel is {hotel_name}. Its location is {city}, {hotel_address}. I am looking for it for {guests} guests. They are staying from {check_in_date} to {check_out_date}. My details include {name}, {phone}, and {email}.",
        "I am looking to book a room of {room_type}. It is at {hotel_name}, at {city}, {hotel_address}, and for {guests} people. Their check-in details are {check_in_date} to {check_out_date}. If you want to reach me, here is my information: {name}, {phone}, and {email}.",
        "I am visiting {city}, and I want to book a hotel room of {room_type}. It is at {hotel_name}. My check-in date is from {check_in_date}, and the check-out will be at {check_out_date}. The hotel is at {city}, {hotel_address}. My contact information is {name}, {phone}, and {email}.",
    ]

    while len(output_list) < num_prompts: 
        dates = generate_random_booking_dates()
        room_type = get_random_room_type()
        guests = get_random_guest()
        name = get_random_name()
        phone, email = get_random_contact()

        check_in_date_result = dates["result_date_format"]
        check_out_date_result = dates["result_check_out_format"]

        # Find a matching hotel
        hotel = find_matching_hotel(hotels_data, room_type, guests)
        if hotel["hotel"]:  # Ensure a matching hotel is found
            selected_hotel = hotel["hotel"]

            # Calculate price details
            original_price = int(selected_hotel["price"])
            discount = int(selected_hotel["discount"])
            discount_amount = (original_price * discount) // 100
            final_price = original_price - discount

            # Generate the prompt
            template = random.choice(prompt_templates)
            prompt = template.format(
                city=selected_hotel["place"],
                hotel_name=selected_hotel["name"],
                hotel_address=selected_hotel["address"],
                room_type=selected_hotel["roomType"],
                guests=guests,
                check_in_date=dates["prompt_date_format"],
                check_out_date=dates["prompt_check_out_format"],
                name=name,
                phone=phone,
                email=email,
            )

            # Append to output list
            output_list.append(
                {
                    "prompt": prompt,  # Include the generated prompt
                    "bookingDetails": {
                        "booking_id": f"ee34476d-a194-42f7-{selected_hotel['id']}-d574b1915545",
                        "check_in_date": check_in_date_result,
                        "check_out_date": check_out_date_result,
                        "guest": guests,
                        "roomType": selected_hotel["roomType"],
                        "hotel": {
                            "id": selected_hotel["id"],
                            "name": selected_hotel["name"],
                            "address": selected_hotel["address"],
                            "price": selected_hotel["price"],
                            "offer": selected_hotel["offer"],
                            "discount": selected_hotel["discount"],
                            "serviceFee": service_fee,
                        },
                    },
                    "paymentDetails": {
                        "price": str(original_price),
                        "discount": str(discount),
                        "priceAfterDiscount": str(final_price),
                    },
                    "userDetails": {
                        "name": name,
                        "email": email,
                        "phone": phone,
                    },
                }
            )

    # Save prompts and booking results to the specified output file
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(output_list, file, indent=4)

    print(f"Generated prompts and saved to {output_file}.")
    return output_list


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate booking prompts and results."
    )
    parser.add_argument(
        "-n",
        "--num_prompts",
        type=int,
        default=20,
        help="Number of Hotel Booking prompts to generate (default: 20).",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=str,
        default="generated_hotel_booking_prompts.json",
        help="Output file to save the prompts and results (default: 'generated_hotel_booking_prompts.json').",
    )

    args = parser.parse_args()
    create_prompts_with_results(args.num_prompts, args.output)
