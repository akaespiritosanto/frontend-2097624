from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import requests

def home(request):
    return Response('''
        <html>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="/form">Formulário</a></li>
                    <li><a href="/api-data">Ver Dados da API</a></li>
                </ul>
            </body>
        </html>
    ''')

def form_page(request):
    return Response('''
        <html>
            <body>
                <form method="POST" action="/process">
                    <input type="text" name="input_text" placeholder="Digite algo...">
                    <button type="submit">Enviar</button>
                </form>
                <a href="/">Voltar ao Menu</a>
            </body>
        </html>
    ''')

def process_input(request):
    input_text = request.params.get('input_text', '')
    
    # Condição para verificar se o texto contém "hello"
    if "hello" in input_text.lower():
        message = f"<p style='color: green;'>Você digitou: {input_text}</p><p>E contém a palavra 'hello'!</p>"
    else:
        message = f"<p style='color: blue;'>Você digitou: {input_text}</p><p>Não contém a palavra 'hello'</p>"
    
    return Response(f'''
        <html>
            <body>
                {message}
                <a href="/form">Voltar ao Formulário</a>
                <a href="/">Voltar ao Menu</a>
            </body>
        </html>
    ''')

def api_data(request):
    # Buscando dados da API JSONPlaceholder (posts)
    response = requests.get('https://jsonplaceholder.typicode.com/posts')
    posts = response.json()
    
    # Criando a lista HTML
    posts_list = '<ul>'
    for post in posts[:5]:  # Mostrando apenas os 5 primeiros posts
        posts_list += f'''
            <li>
                <h3>{post['title']}</h3>
                <p>{post['body']}</p>
            </li>
        '''
    posts_list += '</ul>'
    
    return Response(f'''
        <html>
            <body>
                <h1>Posts da API</h1>
                {posts_list}
                <a href="/">Voltar ao Menu</a>
            </body>
        </html>
    ''')

if __name__ == "__main__":
    with Configurator() as config:
        config.add_route('home', '/')
        config.add_route('form', '/form')
        config.add_route('process_input', '/process')
        config.add_route('api_data', '/api-data')
        
        config.add_view(home, route_name='home')
        config.add_view(form_page, route_name='form')
        config.add_view(process_input, route_name='process_input', request_method='POST')
        config.add_view(api_data, route_name='api_data')
        
        app = config.make_wsgi_app()
    server = make_server("0.0.0.0", 3000, app)
    server.serve_forever()

