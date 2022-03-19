from backend import db, create_app
from backend.models.users import Users

app = create_app()


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': Users}


if __name__ == '__main__':
    app.run()
