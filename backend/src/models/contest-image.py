class ContestImage:
    '''
    A class which models the contest images created and voted on by users.
    '''
    def __init__(self, id, user, prompt, url, votes):
        self.id = id
        self.user = user
        self.prompt = prompt
        self.url = url
        self.votes = votes