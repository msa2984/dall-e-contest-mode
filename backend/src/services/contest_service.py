import os, sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from models import ContestImage


# An empty array which will be populated with ContestImage objects
contest_entries = []
completed_voters = []

def add_contest_image(obj: ContestImage) -> bool:
    '''
    A function which adds the provided ContestImage
    to the global contest_entries List.
    '''
    try:
        # Remove the existing entry for the current user, if it exists.
        for entry in contest_entries:
            if entry.user == obj.user:
                print(f'Removing old entry for {obj.user}')
                contest_entries.remove(obj)
                break
        
        contest_entries.append(obj)
        print(f'Added contest entry for {obj.user}!')

        return True
    except Exception as e:
        print(e)
        return False
    
def vote_for_image(id: str) -> bool:
    '''
    A function which adds 1 vote to the ContestImage specified by ID.
    '''
    try:
        # Remove the existing entry for the current user, if it exists.
        for entry in contest_entries:
            if entry.id == id:
                print(f'Voting for {id}!')
                entry.votes += 1
                return True
        
        print(f'Could not find an image with ID {id} to vote for!')
        return False
    except Exception as e:
        print(e)
        return False

def get_top_scores() -> []:
    '''
    A function which returns the top three ContestImages by score.
    '''
    try:
        sorted_images = sorted(contest_entries, key=lambda x: x.votes)[:3]
        return sorted_images
    except Exception as e:
        print(e)
        return None
    
def get_all_entries() -> []:
    '''
    A function which returns all of the ContestImages.
    '''
    return contest_entries

def complete_voting(user) -> bool:
    '''
    A method to add a voter to the voter list once they have completed voting.
    '''
    completed_voters.append(user)
    return True

def is_voter_present(user) -> bool:
    '''
    A method to return True if a user has already voted.
    '''
    for voter in completed_voters:
        if voter == user:
            return True
    return False
