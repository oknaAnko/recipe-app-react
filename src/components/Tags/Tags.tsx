import React, { useState } from 'react';

import TagsModal from '../Modal/TagsModal';
import { BTN_LABELS } from '../../helpers/constants';
import { ITag } from '../../store/interfaces';

const Tags = ({ recipeId, tags, isEditMode }: { recipeId: number | string; tags: ITag[]; isEditMode: boolean }) => {
  const [currentTags, setCurrentTags] = useState<ITag[]>(tags);

  const recipeTags = currentTags.map((tag) => (
    <div key={tag.id} className='col'>
      <div className='card text-center p-1 tag-style'>
        <p className='card-text'>{tag.name}</p>
      </div>
    </div>
  ));

  const toggleBtnLabel = Boolean(currentTags.length) ? BTN_LABELS.change_tags : BTN_LABELS.add_tags;

  return (
    <div className='col p-3 border-top border-bottom border-1'>
      <div className='row row-cols-auto g-2 pb-3'>{recipeTags}</div>

      {/* EditMode: */}
      {isEditMode && (
        <div className='text-center'>
          <button
            type='button'
            className='btn btn-primary btn-sm text-center'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'>
            {toggleBtnLabel}
          </button>
        </div>
      )}

      <TagsModal recipeId={recipeId} recipeTags={tags} currentTags={currentTags} setCurrentTags={setCurrentTags} />
    </div>
  );
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
