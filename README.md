# Planit (Django / React)

### Planit is a platform where ESL teachers can find interesting and engaging lesson plans that get everyone speaking.

Planit is designed to give users a fast, smooth, and highly interactive experience.
Finding - and even presenting - lesson materials isn't always an enjoyable experience,
and it's rarely a convenient one. Planit gives ESL teachers what they need through a
platform that's both simple and pleasant to use.

#### Backend
- Django backend consisting of 3 main apps:
1. Accounts - hosts API endpoints for all account- and authorization-related processes.
2. Materials - hosts models and API endpoints for product/content-related processes.
3. Frontend - serves the React app.

- Orders fulfilled in coordination with stripe webhooks

#### Frontend
- React frontend which handles all views.

**Views**
1. Welcome / Intro
- Introductory animation directing the user to starting point

2. My Materials
- displays materials owned by the user
- first lesson is automatically granted for free
- materials filter

3. Lesson Plans / All Plans
- displays entire library of available materials
- materials filter

4. Materials View
- displays PDF render of selected materials
- instructions for materials
- view resizing

5. Checkout
- secure order checkout with stripe integration

6. Account
- displays account information
- order details / status
